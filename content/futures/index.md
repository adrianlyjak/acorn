# Writing code with Futures

I frequently see people struggle with a few common scenarios when trying to write
code with futures in scala.

Futures are a powerful construct, they allow easy parallel processing and are a good abstraction for
concurrency and parallelism.

However, they don't have built in support for async/await sugar that often helps programmers
write asynchronous code sync.

Instead Futures implement the common `map`/`flatMap` methods that are common in scala.
Things that implement these methods are approximately "monads,", and can use scala's
syntactic for-comprehension sugar for this. The solution is elegant, it
makes futures intuitive to use if you are already functionally skilled with other monads.
It however introduces a fair amount of confusion when doing operations with the futures that
contain other types of monads, or other types of monads contain futures.
For example a `Future[Option[String]]` or a `Seq[Future[String]]`.

This guide goes through a number of examples of common difficult scenarios. Deeper understanding
of these solutions can also help gain a deeper understanding of scala's type system.

### Option's and Futures

It's often very convenient to map through a series of functions that return options,
or likewise through a series of functions that return futures. However asynchronous functions
frequently also return optional values. Since the optionals are contained in the future, and
the option cannot naturally collapse into a future, the syntax mixed up.

simple working with chained optional values, the values nicely fold in on each other to
return just a single option

```scala
def randomPizzaTopping(): Option[String] = {
  for {
    pizza <- tryToFindAPizza()
    topping <- pizza.toppings.headOption // might be plain cheese pizza
  } yield topping.name
}
```

Note, this can also be rewritten with a `flatMap`

```scala
def randomPizzaTopping(): Option[String] = {
  tryToFindAPizza()
    .flatMap { pizza => pizza.toppings.headOption }
    .map { topping => topping.name }
}
```

likewise chained futures fold together nicely.

```scala
def submit(item: Item): Future[Item] = {
  for {
    resolved <- saveItem(item) // asynchronously save the item to the database
    queued <- events.publish(resolved) // and then send to the remote event service
  } yield resolved
}
```

or with flatMap

```scala
def submit(item: Item): Future[Item] = {
  saveItem(item)
    .flatMap { resolved =>
      events.publish(resolved)
      .map(queued => resolved)
    }
}

```

what about this procedure thought?

1. asynchronously load a user from the database by username, may be none
1. asynchronously fetch latest message from that user's id, may be none
1. return the latest message

One might attempt this as a for comprehension on futures OR options, however futures
and options are not monads to each other. You can't conceptually flatten them together to
reduce the type nesting, options and futures are fundamentally different.

```scala
def lookupLatestMessage(username: String): Future[Option[String]] = {
  for {
    maybeUser <- loadUserNamed(username)
    user <- maybeUser // <- this doesn't work
    messages <- loadMessags(user.id)
    first <- messages.headOption
  }
}
```

The Above doesn't compile, with the message

```
 found   : Option[User]
 required: scala.concurrent.Future[?]
       user <- maybeUser
```

This is just saying you cannot flatMap a future to an option, they are different types
of containers.

Usually the best way to deal with these scenarios is to understand the fundamentals behind
flatMap and for-comprehensions, and pattern matching in order to take advantage of the best of both.
However it' still not the most elegant with nesting, there's fundamental complexity introduced when
working with multiple container types at once

```scala
def lookupLatestMessage(username: String): Future[Option[String]] = {
  loadUserNamed(username)
    .flatMap{
      case None => Future.succesful(None) // bail, but need to rewrap in a future container to maintain consistency
      case Some(user) => loadMessages(user.id)
    }
    .map(_.map(_.headOption))
}
```
