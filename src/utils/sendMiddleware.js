const sendMiddleware = () => {
  // 处理请求成功方法
  const render = ctx => {
    return (data, msg = '请求成功') => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        status: '1',
        data,
        msg
      }
    }
  }

  // 处理请求失败方法
  const renderError = ctx => {
    return (msg = '请求失败') => {
      console.log(msg)
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        status: '0',
        data: null,
        msg
      }
    }
  }

  return async (ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = renderError(ctx);
    await next();
  }
}

export default sendMiddleware