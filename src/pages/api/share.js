import { put } from '../../utils/database'

export default async function share(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 404
    return res.end()
  }

  if (
    typeof req.body !== 'object' ||
    typeof req.body.html !== 'string' ||
    typeof req.body.css !== 'string' ||
    typeof req.body.config !== 'string'
  ) {
    res.statusCode = 400
    return res.end()
  }

  try {
    const { ID } = await put({
      html: req.body.html,
      css: req.body.css,
      config: req.body.config,
    })
    res.statusCode = 200
    res.json({ ID })
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ error: true })
  }
}
