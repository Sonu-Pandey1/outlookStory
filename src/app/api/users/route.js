import prisma from "@/utils/connect";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  //   const { userId } = getAuth();

  //   if (!userId) {
  //     return new NextResponse(
  //       JSON.stringify({ message: "Unauthorized" }),
  //       { status: 401 }
  //     );
  //   }

  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify({ users }), { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 500 }
    );
  }
};

export async function PUT(req) {
  const { userId, newRole } = await req.json();

  // if (!userId || !newRole) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Missing parameters" }),
  //     { status: 400 }
  //   );
  // }

  try {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        role: newRole,
      },
    });

    return new NextResponse(JSON.stringify({ updatedUser }), { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", err.message);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to update role",
      }),
      { status: 500 }
    );
  }
}

 // This is your DELETE handler in the API route
 export async function DELETE(req) {
    try {
      const { userId } = await req.json();  // Parse the request body to get userId
  
      if (!userId) {
        return new NextResponse(
          JSON.stringify({ message: "Missing userId" }),
          { status: 400 }
        );
      }
  
      // Delete user from the database using Prisma
      const deletedUser = await prisma.user.delete({
        where: { userId },  // Use 'userId' as it is the primary key
      });
  
      // Log the deleted user for debugging purposes
      console.log("Deleted user:", deletedUser);
  
      return new NextResponse(
        JSON.stringify({ message: "User deleted", deletedUser }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      return new NextResponse(
        JSON.stringify({ message: "Failed to delete user" }),
        { status: 500 }
      );
    }
  }
  
  