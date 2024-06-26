/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { lastValueFrom, toArray } from 'rxjs';
import { LogEntry, Logger } from './logger';
import { NullLogger } from './null-logger';

describe('NullLogger', () => {
  it('works', (done: DoneFn) => {
    const logger = new NullLogger();
    lastValueFrom(logger.pipe(toArray()))
      .then((observed: LogEntry[]) => {
        expect(observed).toEqual([]);
      })
      .then(
        () => done(),
        (err) => done.fail(err),
      );

    logger.debug('hello');
    logger.info('world');
    logger.complete();
  });

  it('nullifies children', (done: DoneFn) => {
    const logger = new Logger('test');
    lastValueFrom(logger.pipe(toArray()))
      .then((observed: LogEntry[]) => {
        expect(observed).toEqual([]);
      })
      .then(
        () => done(),
        (err) => done.fail(err),
      );

    const nullLogger = new NullLogger(logger);
    const child = new Logger('test', nullLogger);
    child.debug('hello');
    child.info('world');
    logger.complete();
  });
});
