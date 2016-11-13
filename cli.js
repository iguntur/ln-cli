#!/usr/bin/env node
'use strict';
var meow = require('meow');
var makeSymlinks = require('make-symlinks');
var delSymlinks = require('del-symlinks');

var cli = meow([
	'Usage',
	'  $ ln-cli <FILEs|glob> [options]',
	'',
	'Options',
	'  -D, --delete            Delete symlinks',
	'  -f, --force             Overwrite symlinks if it exists',
	'  -d, --dry-run           List what would be created or deleted instead of creating or deleting',
	'      --path              Destination symlinks FILEs [Type: `string`]',
	'      --version           Display the version and exit',
	'      --help              Display this message and exit',
	'',
	'Examples',
	'  $ ln-cli \'dotfiles/*\' \'!dotfiles/.git\' --path \'/home/<username>\'',
	'  $ ln-cli \'/home/<username>/.*\' --delete'
], {
	string: [
		'_',
		'path'
	],
	boolean: [
		'delete',
		'force',
		'dry-run'
	],
	alias: {
		D: 'delete',
		d: 'dry-run',
		f: 'force'
	}
});

if (cli.input.length === 0) {
	console.error('See `--help`');
	process.exit(1);
}

if (cli.flags.path && cli.flags.delete) {
	console.error('Please specifiec `options`');
	process.exit(1);
}

if (cli.flags.path) {
	delete cli.flags.delete;
	var dryRun = cli.flags.dryRun;

	makeSymlinks(cli.input, cli.flags.path, cli.flags).then(function (symlinks) {
		if (dryRun) {
			symlinks.forEach(function (symlink) {
				console.log(symlink.path, '→', symlink.target);
			});
		}
	});
} else if (cli.flags.delete) {
	delete cli.flags.path;
	delete cli.flags.delete;

	delSymlinks(cli.input, cli.flags).then(function (files) {
		if (cli.flags.dryRun) {
			console.log(files.join('\n'));
		}
	});
} else {
	console.error('Please specifiec `options`');
	process.exit(1);
}
