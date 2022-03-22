import Valid from './../valid/Valid.controller'

test('Valid login length (less than 4 letters)', () => {
    expect(Valid.login('Ale')).toBe(false)
})

test('Valid login length (4 & more letters)', () => {
    expect(Valid.login('Alex')).toBe(true)
})

test('Valid login space symbols (with)', () => {
    expect(Valid.login('Ale x')).toBe(false)
})

test('Valid login space symbols (without)', () => {
    expect(Valid.login('Alex')).toBe(true)
})

test('Valid password length (less than 6 letters)', () => {
    expect(Valid.password('00000')).toBe(false)
})

test('Valid password length (6 & more letters)', () => {
    expect(Valid.password('000000')).toBe(true)
})

test('Valid password space symbols (with)', () => {
    expect(Valid.password('000000 ')).toBe(false)
})

test('Valid password space symbols (without)', () => {
    expect(Valid.password('000000')).toBe(true)
})