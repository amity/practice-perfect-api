'use strict';

const featureRoutes = require('../../src/features/index');

describe('Features aggregate testing', () => {
    test('scores feature', () => {
        expect(featureRoutes.filter(
            (route) => route.path.startsWith('/scores') || route.path.startsWith('/leaderboards')).length)
            .toEqual(6);
    });

    test('songs feature', () => {
        expect(featureRoutes.filter(
            (route) => route.path.startsWith('/songs')).length)
            .toEqual(4);
    });

    test('users feature', () => {
        expect(featureRoutes.filter(
            (route) => route.path.startsWith('/users')).length)
            .toEqual(5);
    });

    expect(featureRoutes.length).toEqual(15);
});