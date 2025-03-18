// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import Image from "next/image";
// import Loader from "../Loader";
// import { ThemeContext } from "@/context/ThemeContext";

// const DashUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   const { theme } = useContext(ThemeContext);


//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Set to a valid value like 10

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("/api/users");
//         const data = await res.json();
//         setUsers(data.users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setEditingUser(null);
//   };

//   const handleSaveEdit = async () => {
//     if (!editingUser) return;

//     try {
//       const res = await fetch(`/api/users`, {
//         method: "PUT",
//         body: JSON.stringify({
//           userId: editingUser.userId,
//           newRole: editingUser.role,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.ok) {
//         setUsers((prev) =>
//           prev.map((user) =>
//             user.userId === editingUser.userId ? editingUser : user
//           )
//         );
//         handleCloseModal(); // Close the modal after saving
//       }
//     } catch (error) {
//       console.error("Error saving user edit:", error);
//     }
//   };

//   const handleDelete = async (userId) => {
//     console.log(userId);
//     try {
//       // Change the API call to send userId in the body
//       const res = await fetch(`/api/users`, {
//         method: "DELETE",
//         body: JSON.stringify({ userId }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.ok) {
//         setUsers((prev) => prev.filter((user) => user.userId !== userId));
//       } else {
//         const error = await res.json();
//         console.error("Error deleting user:", error.message);
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   if (loading) return <div><Loader /></div>;

//   return (
//     <div
//       className="container DashUsersContainer d-flex justify-content-center flex-column p-4"
//       style={{
//         height: "calc(100vh - 60px)",
//         overflowY: "auto", // Ensure the container can scroll if necessary
//       }}
//     >
//       <h2>User&#39;s</h2>

//       <TableContainer className={`mainTable  ${theme === "dark" ? "dark" : "light"}`} style={{ maxHeight: "100%", overflowY: "auto" }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Image</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((user) => (
//                 <TableRow key={user.userId}>
//                   <TableCell>
//                     <Image
//                       src={user.image}
//                       alt="User"
//                       width="50"
//                       height="50"
//                       style={{ borderRadius: "50%" }}
//                     />
//                   </TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleEdit(user)}
//                     >
//                       <Edit />
//                     </IconButton>
//                     <IconButton
//                       color="secondary"
//                       onClick={() => handleDelete(user.userId)}
//                     >
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         className=" overflow-hidden"
//         component="div"
//         count={users.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25, 50, 100]} // Include 5 if you want to support it
//       />

//       {/* Edit User Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           {editingUser && (
//             <div>
//               <Image
//                 src={editingUser.image}
//                 alt="User"
//                 width="100"
//                 height="100"
//                 style={{ borderRadius: "50%" }}
//               />
//               <TextField
//                 label="Name"
//                 value={editingUser.name}
//                 onChange={(e) =>
//                   setEditingUser({ ...editingUser, name: e.target.value })
//                 }
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Role"
//                 value={editingUser.role}
//                 onChange={(e) =>
//                   setEditingUser({ ...editingUser, role: e.target.value })
//                 }
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Number of Posts"
//                 value={editingUser.numberOfPosts}
//                 onChange={(e) =>
//                   setEditingUser({
//                     ...editingUser,
//                     numberOfPosts: e.target.value,
//                   })
//                 }
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Created At"
//                 value={editingUser.createdAt}
//                 fullWidth
//                 margin="normal"
//                 disabled
//               />
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveEdit} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DashUsers;


// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import Image from "next/image";
// import Loader from "../Loader";
// import * as timeago from "timeago.js";
// import { ThemeContext } from "@/context/ThemeContext";
// import "./DashUsers.scss"

// const DashUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const { theme } = useContext(ThemeContext);
// // console.log(users)
//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(4);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("/api/users");
//         if (!res.ok) throw new Error("Failed to fetch users");
//         const data = await res.json();
//         setUsers(data.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleChangePage = (_, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEdit = (user) => {
//     setEditingUser({ ...user });
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setEditingUser(null);
//   };

//   const handleSaveEdit = async () => {
//     if (!editingUser) return;
//     try {
//       const res = await fetch(`/api/users`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: editingUser.userId,
//           newRole: editingUser.role,
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to update user");

//       setUsers((prev) =>
//         prev.map((user) => (user.id === editingUser.userId ? editingUser : user))
//       );
//       handleCloseModal();
//     } catch (error) {
//       console.error("Error saving user edit:", error);
//     }
//   };

//   const handleDelete = async (userId) => {
//     // console.log(userId)
//     try {
//       const res = await fetch(`/api/users`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });
      
//       if (!res.ok) throw new Error("Failed to delete user");
//       setUsers((prev) => prev.filter((user) => user.userId !== userId));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className={`container DashUsersContainer d-flex flex-column `}>
//       <Typography variant="h4" className="text-center my-4">Manage Users</Typography>
//       <TableContainer className={`mainTable ${theme === "dark" ? "dark" : "light"}`}>
//         <Table>
//           <TableHead>
//             <TableRow className="">
//               <TableCell className="forDarkColor">Image</TableCell>
//               <TableCell className="forDarkColor">Name</TableCell>
//               <TableCell className="forDarkColor">Role</TableCell>
//               <TableCell className="forDarkColor">Time</TableCell>
//               <TableCell className="forDarkColor">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user,index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   {user.image && (
//                     <Image src={user.image} alt="User" width={50} height={50} style={{ borderRadius: "50%" }} />
//                   )}
//                 </TableCell>
//                 <TableCell className="forDarkColor">{user.name}</TableCell>
//                 <TableCell className="forDarkColor">{user.role}</TableCell>
//                 <TableCell className="forDarkColor"> <p>{timeago.format(user.createdAt)}</p></TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEdit(user)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         className={`${theme === "dark" ? "text-light" : "text-dark"}`}
//         component="div"
//         count={users.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[4, 10, 25, 50, 100]}
//       />

//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           {editingUser && (
//             <>
//               {editingUser.image && (
//                 <Image src={editingUser.image} alt="User" width={100} height={100} style={{ borderRadius: "50%" }} />
//               )}
//               <TextField label="Name" value={editingUser.name || ""} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} fullWidth margin="normal" />
//               <TextField label="Role" value={editingUser.role || ""} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} fullWidth margin="normal" />
//               <TextField label="Number of Posts" type="number" value={editingUser.numberOfPosts || 0} onChange={(e) => setEditingUser({ ...editingUser, numberOfPosts: parseInt(e.target.value, 10) || 0 })} fullWidth margin="normal" />
//               <TextField label="Created At" value={editingUser.createdAt || ""} fullWidth margin="normal" disabled />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
//           <Button onClick={handleSaveEdit} color="primary">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DashUsers;




"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Image from "next/image";
import Loader from "../Loader";
import * as timeago from "timeago.js";
import { ThemeContext } from "@/context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DashUsers.scss";

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingUser(null);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.userId,
          newRole: editingUser.role,
        }),
      });
      if (!res.ok) throw new Error("Failed to update user");
      
      setUsers((prev) =>
        prev.map((user) => (user.userId === editingUser.userId ? editingUser : user))
      );
      toast.success("User updated successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/users`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to delete user");
      
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={`container DashUsersContainer d-flex flex-column `}>
      <Typography variant="h4" className="text-center my-4">Manage Users</Typography>
      <TableContainer className={`mainTable ${theme === "dark" ? "dark" : "light"}`}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="forDarkColor">Image</TableCell>
              <TableCell className="forDarkColor">Name</TableCell>
              <TableCell className="forDarkColor">Role</TableCell>
              <TableCell className="forDarkColor">Time</TableCell>
              <TableCell className="forDarkColor">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  {user.image && <Image src={user.image} alt="User" width={50} height={50} style={{ borderRadius: "50%" }} />}
                </TableCell>
                <TableCell className="forDarkColor">{user.name}</TableCell>
                <TableCell className="forDarkColor">{user.role}</TableCell>
                <TableCell className="forDarkColor">{timeago.format(user.createdAt)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className={`${theme === "dark" ? "text-light" : "text-dark"}`}
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[4, 10, 25, 50, 100]}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editingUser && (
            <TextField
              label="Role"
              value={editingUser.role || ""}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              fullWidth margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default DashUsers;