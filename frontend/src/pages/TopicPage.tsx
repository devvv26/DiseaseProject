import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container, Typography, Box, Paper } from '@mui/material';
import { contentData } from '../data/diabetesContent'; // FIX 1: Import 'contentData'

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  // If topicId is undefined, we can't proceed.
  if (!topicId) {
    return <Navigate to="/" />;
  }

  // FIX 2: Access the data as an object using the topicId as the key.
  const content = contentData[topicId];

  // If no content exists for that key, redirect to the homepage.
  if (!content) {
    return <Navigate to="/" />;
  }

  // If content is found, display it.
  return (
    <Container maxWidth="lg">
      {/* The 'py' property has been removed from the Box below. */}
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {content.title}
          </Typography>
          
          {/* FIX 3: Loop over 'content.content' which is the array of paragraphs. */}
          {content.content.map((paragraph, index) => (
            <Typography variant="body1" paragraph key={index} sx={{ lineHeight: 1.7 }}>
              {paragraph}
            </Typography>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default TopicPage;