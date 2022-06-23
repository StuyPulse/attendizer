export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      students: [
        { id: 0, name: 'Alpha', osis: 123456789, uid: 1234567890123 },
        { id: 1, name: 'Bravo', osis: 987654321, uid: 3210987654321 },
        { id: 2, name: 'Charlie', osis: 123123123, uid: 1231231231230 },
        { id: 3, name: 'Delta', osis: 321321321, uid: 3213213213210 }
      ]
    });
  }
}
