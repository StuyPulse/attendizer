export default function handler(req, res) {
  if (req.method === 'POST') {
    // TODO: connect to express server
    res.status(200).json({ name: 'John Doe' })
  } else {
    res.status(403).end()
  }
}