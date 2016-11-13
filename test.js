import fs from 'fs';
import {join} from 'path';
import test from 'ava';
import rimraf from 'rimraf';
import execa from 'execa';
import isSymbolicLink from 'is-symbolic-link';

global.Promise = Promise;

test.beforeEach(() => {
	rimraf('.tmp', () => fs.mkdirSync('.tmp'));
});

test.after(() => {
	rimraf.sync('.tmp');
});

test.serial('create symlinks', async t => {
	await execa('./cli.js', ['*', '--path', '.tmp']);

	fs.readdirSync('.tmp').forEach(f => {
		t.true(fs.existsSync(join('.tmp', f)));
		t.true(isSymbolicLink.sync(join('.tmp', f)));
	});
});

test.serial('delete symlinks', async t => {
	await execa('./cli.js', ['./tmp/*', '--delete']);

	fs.readdirSync('.tmp').forEach(f => {
		t.false(fs.existsSync(join('.tmp', f)));
	});
});
