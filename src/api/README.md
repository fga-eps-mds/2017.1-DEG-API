Exemplo de API
======

```js
import { Router } from 'express'
import Tag from '../models/tag'

export default ({ config, db }) => {
  let router = Router()

  router.param('tag', (req, resp, next, id) => {
    req.tag = Tag.get(id)
    next()
  })

  router.get('/', async ({ params }, res) => {
    try {
      res.json(await Tag.run())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.get('/:tag', async ({ tag }, res) => {
    try {
      res.json(await tag)
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/', async ({ body }, res) => {
    try {
      res.json(await Tag.save(body.tag))
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.put('/:tag', async ({ tag, body }, res) => {
    try {
      let doc = await tag
      res.json(await doc.merge(body.tag).save())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.delete('/:tag', async ({ tag }, res) => {
    try {
      res.json(await tag.delete())
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  return router
}
```

```js
import { Router } from 'express'
import Invite from '../models/invite'
import { parseError } from './helper'

export default ({ config, db }) => {
  let router = Router()

  router.param('invite', (req, resp, next, id) => {
    req.invite = Invite.get(id)
    next()
  })

  router.get('/', ({ params }, res) => {
    Invite.getJoin({tags: true}).run()
      .then(data => res.json(data))
      .catch(parseError(err => res.status(404).json(err)))
  })

  router.get('/:invite', ({ invite }, res) => {
    invite.getJoin({tags: true}).then(data => res.json(data))
      .catch(parseError(err => res.status(404).json(err)))
  })

  router.post('/', ({ body }, res) => {
    Invite.save(body.invite)
      .then(data => res.json(data))
      .catch(parseError(err => res.status(404).json(err)))
  })

  router.put('/:invite', ({ invite, body }, res) => {
    invite.then(doc => doc.merge(body.invite).save())
      .then(data => res.json(data))
      .catch(parseError(err => res.status(404).json(err)))
  })

  router.delete('/:invite', ({ invite }, res) => {
    invite.then(doc => doc.delete())
      .then(data => res.json(data))
      .catch(parseError(err => res.status(404).json(err)))
  })

  return router
}

```

```js
import { Router } from 'express'
import Tag from '../models/tag'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('tag', (req, resp, next, id) => {
    req.tag = Tag.get(id)
    next()
  })

  router.get('/', async ({ invite, params }, res) => {
    try {
      res.json((await invite.getJoin({tags: true})).tags || [])
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.post('/:tag', async ({ invite, tag }, res) => {
    try {
      res.json(await invite.addRelation('tags', await tag))
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  router.delete('/:tag', async ({ invite, tag }, res) => {
    try {
      res.json(await invite.removeRelation('tags', await tag))
    } catch (err) {
      res.status(404).json({ error: err.name })
    }
  })

  return router
}
```
