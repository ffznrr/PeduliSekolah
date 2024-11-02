import { NextResponse } from 'next/server';
import { getUserById, updateUserType } from '@/db/models/user';
import { updateSchoolDocumentStatus } from '@/db/models/schoolDocument';

export async function POST(request: Request) {
  try {
    const { userId, schoolDocumentId } = await request.json(); // Expecting the userId and schoolDocumentId in the request body

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update school document status to "Tidak Layak"
    await updateSchoolDocumentStatus(schoolDocumentId, 'Tidak Layak');

    // Update the user's account type to "School"
    await updateUserType(userId, 'school');

    return NextResponse.json({ message: 'User and document updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user or document' }, { status: 500 });
  }
}
