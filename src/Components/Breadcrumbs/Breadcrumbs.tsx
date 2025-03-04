// React
import React from 'react';

// Materia IU
import { Breadcrumbs, Link, Typography } from '@mui/material';

// Styles
import styles from './styles'

/**
 * Breacumbs
 */
export default function CustomBreadcrumbs({ paths = [], maxLength = 30 }) {
  const truncateText = (text) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Breadcrumbs sx={styles.contBreadcrumbs} separator="/" aria-label="breadcrumb">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const displayText = truncateText(path);

        if (isLast) {
          return (
            <Typography key={index} style={styles.brecrumbsPremium}>
              {displayText}
            </Typography>
          );
        }

        return (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href="#"
            sx={styles.brecumbsNormal}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {displayText}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}