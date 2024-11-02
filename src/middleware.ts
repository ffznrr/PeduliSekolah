import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./utils/jose";

export const middleware = async (request: NextRequest) => {
  const url = request.nextUrl;

  // Skip middleware for auth-related API requests
  if (url.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Retrieve token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let tokenData;
  try {
    // Verify the token and extract user data
    tokenData = await verifyTokenJose<{
      id: string;
      role: string;
      account_type: string;
      username: string;
      schoolstatus: string;
    }>(token.value);
    console.log(tokenData);
  } catch (error) {
    console.log("Failed to decode token", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isMainPage = url.pathname.startsWith("/");
  const isAdminPage = url.pathname.startsWith("/admin");
  const isPostPage = url.pathname.startsWith("/post/");
  const isAddPostPage = url.pathname.startsWith("/add-post");
  const isSchoolDocumentPage = url.pathname.startsWith("/school-document");

  const response = NextResponse.next();

  // Protect /admin route
  if (isAdminPage && tokenData.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect /add-post route: only "School" account types can add posts
  if (
    (isAddPostPage && tokenData.account_type !== "school") ||
    (isAddPostPage && tokenData.schoolstatus !== "Tidak Layak")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Set user data in cookies for specific routes (admin, post, add-post)
  if (
    isMainPage ||
    isAdminPage ||
    isPostPage ||
    isAddPostPage ||
    isSchoolDocumentPage
  ) {
    response.cookies.set("userId", tokenData.id, {
      path: "/",
    });
    response.cookies.set("role", tokenData.role, {
      path: "/",
    });
    response.cookies.set("accountType", tokenData.account_type, {
      path: "/",
    });
    response.cookies.set("username", tokenData.username, {
      path: "/",
    });
    response.cookies.set("schoolstatus", tokenData.schoolstatus, {
      path: "/",
    });

    return response;
  }

  if (url.pathname.startsWith("/api")) {
    response.cookies.set("userId", tokenData.id, {
      path: "/",
    });
    response.cookies.set("role", tokenData.role, {
      path: "/",
    });
    response.cookies.set("accountType", tokenData.account_type, {
      path: "/",
    });
    response.cookies.set("username", tokenData.username, {
      path: "/",
    });
    return response;
  }

  // For other routes, pass user details in headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-userId", tokenData.id);
  requestHeaders.set("x-role", tokenData.role);
  requestHeaders.set("x-accountType", tokenData.account_type);
  requestHeaders.set("x-username", tokenData.username);

  return NextResponse.next({
    headers: requestHeaders,
  });
};

// Configure paths for the middleware to match
export const config = {
  matcher: [
    "/admin/:path*", // Protect admin pages
    "/midtrans", // Protect midtrans-related routes
    "/school-document", // Protect school-document pages
    "/post/:path*", // Protect post-related routes
    "/add-post", // Protect add-post route
  ],
};
