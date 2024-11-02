// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import authOptions from "../authOption"; // Import from the new file

// Create a handler for the NextAuth routes
const handler = NextAuth(authOptions);

// Export the handler as GET and POST methods
export { handler as GET, handler as POST };
