import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardActionArea, CardContent, Collapse, Grid } from '@mui/material';

// REPLACE the old 'diabetesTopics' constant with this new, detailed version.
const diabetesTopics = [
  {
    title: 'About Diabetes',
    content: `Diabetes is a condition where your body has trouble managing the sugar (glucose) in your blood. Normally, a hormone called insulin acts like a key, letting sugar from your food enter your cells to be used for energy. When you have diabetes, either your body doesn't produce enough insulin, or the cells stop responding to it properly. This causes too much sugar to remain in your bloodstream, which can lead to serious health issues over time.`
  },
  {
    title: 'Warning Signs & Symptoms',
    content: `Symptoms can be subtle at first, so it's important to know what to look for. Key warning signs include:
    • Constant thirst and frequent urination
    • Feeling very hungry, even after eating
    • Extreme, unexplained fatigue
    • Blurry vision
    • Cuts or bruises that are slow to heal
    • Tingling, pain, or numbness in the hands or feet (especially in Type 2)`
  },
  {
    title: 'Prediabetes',
    content: `Think of prediabetes as a critical warning sign. It means your blood sugar levels are higher than normal, but not yet high enough to be classified as Type 2 diabetes. The vast majority of people with prediabetes don't know they have it. The good news is that with early intervention through lifestyle changes like diet and exercise, you can often prevent or delay prediabetes from progressing to full-blown diabetes.`
  },
  {
    title: 'Diabetes Prevention',
    content: `While Type 1 diabetes cannot be prevented, you have significant power to prevent or delay Type 2 diabetes. The key pillars of prevention are:
    • Healthy Eating: Focus on whole foods like vegetables, fruits, and lean proteins. Limit processed foods and sugary drinks.
    • Regular Physical Activity: Aim for at least 30 minutes of moderate activity, like a brisk walk, most days of the week.
    • Weight Management: If you are overweight, losing even a small amount of weight (5-7% of your body weight) can make a huge difference.`
  },
  {
    title: 'Type 1 Diabetes',
    content: `Type 1 is an autoimmune condition. This means the body's own immune system mistakenly attacks and destroys the insulin-producing cells in the pancreas. It is not caused by diet or lifestyle. People with Type 1 diabetes produce very little or no insulin and must take insulin daily through injections or an insulin pump to live.`
  },
  {
    title: 'Type 2 Diabetes',
    content: `This is the most common form of diabetes. In Type 2, your body either doesn't produce enough insulin or your cells become resistant to its effects (called insulin resistance). This means the "keys" to your cells don't work properly. It is strongly linked to genetics and lifestyle factors like physical inactivity and being overweight. It is often managed with diet, exercise, and oral medications, though some may eventually need insulin.`
  },
  {
    title: 'Gestational Diabetes',
    content: `This type of diabetes occurs exclusively during pregnancy. Hormones produced by the placenta can block the mother's insulin from working effectively, leading to high blood sugar. It typically develops around the 24th week and usually disappears after the baby is born. However, it increases the mother's risk of developing Type 2 diabetes later in life.`
  },
  {
    title: 'Devices & Technology',
    content: `Managing diabetes has been revolutionized by technology. Key tools include:
    • Blood Glucose Meters: Allow for quick finger-prick tests to check your blood sugar at any moment.
    • Continuous Glucose Monitors (CGMs): Use a small sensor worn on the body to track your glucose levels 24/7, providing real-time data and trends.
    • Insulin Pumps: Small, computerized devices that deliver a steady, continuous dose of insulin throughout the day, eliminating the need for many daily injections.`
  },
  {
    title: 'Vaccinations',
    content: `Having diabetes can weaken your immune system, making you more vulnerable to serious complications from common illnesses. It is crucial to stay up-to-date on vaccinations. Key recommended vaccines for people with diabetes include the annual Flu shot, Pneumonia vaccines (Pneumovax 23 and Prevnar 13), and the Hepatitis B series.`
  },
  {
    title: 'Common Terms',
    content: `Understanding the language of diabetes is empowering. Here are a few key terms:
    • A1C: A blood test that reflects your average blood sugar levels over the past 2-3 months.
    • Hypoglycemia: The medical term for low blood sugar.
    • Hyperglycemia: The medical term for high blood sugar.
    • Insulin Resistance: When cells in your muscles, fat, and liver don't respond well to insulin and can't easily take up glucose from your blood.`
  }
];

const backgroundUrl = 'https://images.unsplash.com/photo-1523741543342-1a2e3gfa22?auto=format&fit=crop&w=1920&q=80';

const AboutDiabetesPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)', borderRadius: 4, p: { xs: 2, md: 4 } }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Understanding Diabetes
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Your comprehensive guide to diabetes. Click on any topic below to learn more.
        </Typography>
        <Grid container spacing={3}>
          {diabetesTopics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={4} key={topic.title}>
              <Card raised sx={{ borderRadius: 2, transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
                <CardActionArea onClick={() => handleExpand(index)} sx={{ p: 2 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
                    {topic.title}
                  </Typography>
                </CardActionArea>
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {topic.content}
                    </Typography>
                    {/* The external link has been removed */}
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutDiabetesPage;