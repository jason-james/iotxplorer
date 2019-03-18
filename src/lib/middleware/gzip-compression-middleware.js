import compress from "koa-compress";

export function enableGzip(server) {
  server.app.use(
    compress({
      filter: function(content_type) {
        return /text/i.test(content_type);
      },
      threshold: 2048,
      flush: require("zlib").Z_SYNC_FLUSH
    })
  );

  server.app.use((ctx, next) => {
    ctx.compress = true;
    ctx.body = fs.createReadStream(file);
  });
}
