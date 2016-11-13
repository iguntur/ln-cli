# ln-cli [![Build Status](https://travis-ci.org/iguntur/ln-cli.svg?branch=master)](https://travis-ci.org/iguntur/ln-cli)

> Create or delete symbolic link using glob


## Install

``` bash
$ npm install --global ln-cli
```


## Usage

```
$ ln-cli --help

  Create or delete symlinks using glob

  Usage
    $ ln-cli <FILEs|glob> [options]

  Options
    -D, --delete            Delete symlinks
    -f, --force             Overwrite symlinks if it exists
    -d, --dry-run           List what would be created or deleted instead of creating or deleting
        --path              Destination symlinks FILEs [Type: `string`]
        --version           Display the version and exit
        --help              Display this message and exit

  Examples
    $ ln-cli 'dotfiles/*' '!dotfiles/.git' --path '/home/<username>'
    $ ln-cli '/home/<username>/.*' --delete
```


## Related

- [del-symlinks](https://github.com/iguntur/del-symlinks) - API for this module. Delete symlinks using glob
- [make-symlinks](https://github.com/iguntur/make-symlinks) - API for this module. Make symlinks using glob
- [del-symlinks-cli](https://github.com/iguntur/del-symlinks-cli) - Only Delete symlinks using glob


## License

MIT © [Guntur Poetra](http://guntur.starmediateknik.com)
