@radham/is-x
============

Check if a file is executable for all.

Install
-------

As a system CLI tool:

```shell
npm install --global @radham/is-x
```

As a project dependency:

```shell
npm install @radham/is-x
```

Usage
-----

### CLI

```sh-session
$ is-x --help

  Check if a file is executable for all.

  Usage
    $ is-x <FILE>

  Options
    --help, -h     Display this message.
    --version, -v  Display the application version.
```

### API

```typescript
import { isExecutable, isExecutableSync } from '@radham/is-x';

const filepath = './bin';

// Asynchronous...
await isExecutable(filepath); // > Promise<boolean>

// Synchronous...
isExecutableSync(filepath);   // > boolean
```

See Also
--------

- [@radham/plus-x](https://www.npmjs.com/package/@radham/plus-x)

License
-------
The BSD 3-Clause License. See the [license file](LICENSE) for details.
