export default function handler(req, res) {
  // TODO: connect to express server
  if (req.method === 'POST') {
    if (req.body.scanEntry === '000000000') {
      // 000000000 will simulate an error
      res
        .status(418)
        .send({ message: 'vincent is not a big fan of your request' });
    } else {
      res
        .status(200)
        .json({ name: 'John Doe', time: new Date().toLocaleTimeString() });
    }
  } else {
    res.status(400).send({ message: 'u goofed up' });
  }
}
