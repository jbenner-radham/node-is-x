@radham/is-x
============

Check if a file is executable.

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

License
-------
The BSD 3-Clause License. See the [license file](LICENSE) for details.
