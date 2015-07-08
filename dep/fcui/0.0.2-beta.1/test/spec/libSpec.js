/**
 * FCUI lib spec
 * @param {Object} lib lib
 */
define('spec/libSpec', ['fcui/lib'], function (lib) {
    describe('FCUI lib', function() {
        it('can replace basic target content', function () {
            expect(lib.replaceTarget(
                '<!-- target: myTarget --> mycontent',
                'myTarget',
                'yourcontent'
            )).toBe(
                '<!-- target: myTarget --> yourcontent '
            );
        });

        it('can replace basic target content with newline', function () {
            expect(lib.replaceTarget(
                '<!-- target: myTarget -->\nmycontent',
                'myTarget',
                'yourcontent'
            )).toBe(
                '<!-- target: myTarget --> yourcontent '
            );
        });

        it('can replace target content of 2 targets', function () {
            expect(lib.replaceTarget(
                    '<!-- target: myTarget -->\nmycontent'
                +   '<!-- target: yourTarget -->\nyourcontent',
                'myTarget',
                'yourcontent'
            )).toBe(
                    '<!-- target: myTarget --> yourcontent '
                +   '<!-- target: yourTarget -->\nyourcontent'
            );
        });
    });
});
