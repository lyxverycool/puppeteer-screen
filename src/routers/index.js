import homepage from './homepage'
import screen from './screen'

export default app => {
  app.use(homepage.routes()).use(homepage.allowedMethods())
  app.use(screen.routes()).use(screen.allowedMethods())
}
