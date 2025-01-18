import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

const App = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h5" component="div" gutterBottom>
            Socket.IO Chat App
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Connected ID: {socketID}
          </Typography>

          <form onSubmit={joinRoomHandler} style={{ marginBottom: 16 }}>
            <Typography variant="h6" component="div">
              Join a Room
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  label="Room Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Join
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ marginY: 2 }} />

          <form onSubmit={handleSubmit}>
            <Typography variant="h6" component="div">
              Send a Message
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  label="Message"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  label="Room"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ marginY: 2 }} />

          <Stack spacing={2} sx={{ maxHeight: 200, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Paper key={i} elevation={1} sx={{ padding: 1 }}>
                <Typography variant="body1">{m}</Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default App;
