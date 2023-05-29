export const getMsgs = () => {
  const messages = JSON.parse(localStorage.getItem('messages'));
if (!messages) {
  localStorage.setItem('messages', JSON.stringify({}));
  return {}
} else {
  return messages;
}
}

export const registerMsg = (msg, room) => {
  const messages = JSON.parse(localStorage.getItem('messages'));
  if (!messages[room]) {
    const newRoom = { ...messages, [room]: [msg]}
    localStorage.setItem('messages', JSON.stringify(newRoom))
  } else {
    localStorage.setItem('messages', JSON.stringify({...messages, [room]: [...messages[room], msg]}))
  }
}
