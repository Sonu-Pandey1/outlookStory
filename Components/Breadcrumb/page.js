"use client";

import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { emphasize } from "@mui/material/styles";
import "./Breadcrumb.scss";

// Styled Breadcrumb component with hover and active states
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.26),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
    "& .MuiChip-icon": {
      marginRight: theme.spacing(0.5),
    },
  };
});

export default function Breadcrumb({ category, category1, category2 }) {
  return (
    <Breadcrumbs
      className=" px-3"
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {/* Home Link */}
      <StyledBreadcrumb
        component="a"
        href="/"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
      />

      {/* Category */}
      {category && (
        <StyledBreadcrumb
          component="a"
          href={`/category/${category}`}
          label={category}
          icon={<CategoryIcon fontSize="small" />}
        />
      )}

      {/* Subcategory */}
      {category1 && (
        <StyledBreadcrumb
          component="a"
          href={`/category/${category1}`}
          label={category1}
          icon={<FolderIcon fontSize="small" />}
        />
      )}

      {/* Active Category */}
      {category2 && (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.primary",
            fontWeight: "500",
          }}
        >
          <DescriptionOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {category2}
        </Typography>
      )}
    </Breadcrumbs>
  );
}
