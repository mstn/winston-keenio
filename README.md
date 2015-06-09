> WIP - not ready for production yet.
> API could change.

## winston-keenio

A [Keen.io](http://keen.io/) transport for [Winston](https://github.com/winstonjs/winston).

### Strict mode (proposal)

In Keen.io a project can have multiple collections.
We want to define transports dependent on collections and not only log levels. For this reason Keen.io transport can be defined also in "strict mode". When a transport is defined in strict mode, then events are logged to Keen.io only if they are tagged with the name of the collection associated to a transport.

```javascript
var client = new Keenio({
  projectId: 'MY_PROJECT_ID',
  writeKey: 'MY_WRITE_KEY',
  collection: 'MY_COLLECTION',
  strict:true
});
```

This solution is tentative. Does it make sense? I am open to better suggestions.

## Roadmap

At the moment only single events can be sent to KeenIO server. In the future I would like to consider also multiple events and queries.

## References

[Winston](https://github.com/winstonjs/winston/).

How to build [Winston transports](https://github.com/winstonjs/winston/#adding-custom-transports). Examples [here](https://github.com/winstonjs/winston-loggly) and [there](https://keen.io/blog/104315470061/how-we-used-keen-to-change-the-way-people-measure).

Keen IO js SDK [documentation](https://github.com/keen/keen-js/tree/master/docs).
