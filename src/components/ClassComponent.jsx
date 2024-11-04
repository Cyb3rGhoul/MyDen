import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { AccessTime as ClockIcon } from '@mui/icons-material';

// Sample data
const classes = [
  { id: 1, name: 'Math', professor: 'Dr. Johnson', time: '9:00 AM' },
  { id: 2, name: 'English', professor: 'Ms. Williams', time: '11:00 AM' },
  { id: 3, name: 'Biology', professor: 'Dr. Lee', time: '1:00 PM' },
  { id: 4, name: 'History', professor: 'Mr. Patel', time: '3:00 PM' },
];

const sampleTimetable = [
  { day: 'Monday', '9:00 AM': 'Math', '11:00 AM': 'English', '1:00 PM': 'Biology', '3:00 PM': 'History' },
  { day: 'Tuesday', '9:00 AM': 'English', '11:00 AM': 'History', '1:00 PM': 'Math', '3:00 PM': 'Biology' },
  { day: 'Wednesday', '9:00 AM': 'Biology', '11:00 AM': 'Math', '1:00 PM': 'English', '3:00 PM': 'History' },
  { day: 'Thursday', '9:00 AM': 'History', '11:00 AM': 'Biology', '1:00 PM': 'Math', '3:00 PM': 'English' },
  { day: 'Friday', '9:00 AM': 'Math', '11:00 AM': 'English', '1:00 PM': 'Biology', '3:00 PM': 'History' },
];

const ClassComponent = () => {
  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>All Classes</Typography>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                {classes.map((cls) => (
                  <Card key={cls.id} sx={{ backgroundColor: 'rgba(29, 23, 83, 0.4)' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1}>
                        <ClockIcon />
                        <Typography>{cls.time}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">{cls.name}</Typography>
                        <Typography color="textSecondary">{cls.professor}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Weekly Timetable</Typography>
              <LineChart width={400} height={300} data={sampleTimetable}>
                <XAxis dataKey="day" />
                <YAxis type="category" domain={['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="9:00 AM" stroke="#8884d8" />
                <Line type="monotone" dataKey="11:00 AM" stroke="#82ca9d" />
                <Line type="monotone" dataKey="1:00 PM" stroke="#ffc658" />
                <Line type="monotone" dataKey="3:00 PM" stroke="#ff7300" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassComponent;