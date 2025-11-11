import { bench, describe } from 'vitest'

describe('Array Operations Benchmarks', () => {
  describe('@benchmark @performance', () => {
    const sizes = [100, 1000, 10000]
    
    sizes.forEach(size => {
      const arr = Array.from({ length: size }, (_, i) => i)
      
      bench(`Array.sort() - ${size} elements`, () => {
        const copy = [...arr]
        copy.sort((a, b) => b - a)
      })

      bench(`Array.reverse() - ${size} elements`, () => {
        const copy = [...arr]
        copy.reverse()
      })

      bench(`for loop sum - ${size} elements`, () => {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i]
        }
      })

      bench(`reduce sum - ${size} elements`, () => {
        arr.reduce((acc, val) => acc + val, 0)
      })

      bench(`Array.map() - ${size} elements`, () => {
        arr.map(x => x * 2)
      })

      bench(`Array.filter() - ${size} elements`, () => {
        arr.filter(x => x % 2 === 0)
      })
    })
  })
})

describe('String Operations Benchmarks', () => {
  describe('@benchmark @performance', () => {
    const shortString = 'Hello World'
    const longString = 'Lorem ipsum dolor sit amet, '.repeat(100)
    
    bench('String concatenation - short', () => {
      let result = ''
      for (let i = 0; i < 100; i++) {
        result += shortString
      }
    })

    bench('String join - short', () => {
      const parts = new Array(100).fill(shortString)
      parts.join('')
    })

    bench('String concatenation - long', () => {
      let result = ''
      for (let i = 0; i < 10; i++) {
        result += longString
      }
    })

    bench('String join - long', () => {
      const parts = new Array(10).fill(longString)
      parts.join('')
    })

    bench('String.replace() - simple', () => {
      longString.replace(/ipsum/g, 'IPSUM')
    })

    bench('String.split() and join()', () => {
      longString.split(' ').join('-')
    })
  })
})

describe('Object Operations Benchmarks', () => {
  describe('@benchmark @performance', () => {
    const smallObject = { a: 1, b: 2, c: 3 }
    const largeObject = Object.fromEntries(
      Array.from({ length: 100 }, (_, i) => [`key${i}`, i])
    )

    bench('Object.keys() - small', () => {
      Object.keys(smallObject)
    })

    bench('Object.keys() - large', () => {
      Object.keys(largeObject)
    })

    bench('Object spread - small', () => {
      const copy = { ...smallObject }
    })

    bench('Object spread - large', () => {
      const copy = { ...largeObject }
    })

    bench('Object.assign() - small', () => {
      Object.assign({}, smallObject)
    })

    bench('Object.assign() - large', () => {
      Object.assign({}, largeObject)
    })

    bench('JSON.parse(JSON.stringify()) - small', () => {
      JSON.parse(JSON.stringify(smallObject))
    })

    bench('JSON.parse(JSON.stringify()) - large', () => {
      JSON.parse(JSON.stringify(largeObject))
    })
  })
})

describe('Map vs Object Benchmarks', () => {
  describe('@benchmark @performance @comparison', () => {
    const size = 1000
    const obj: Record<string, number> = {}
    const map = new Map<string, number>()
    
    // Setup data
    for (let i = 0; i < size; i++) {
      const key = `key${i}`
      obj[key] = i
      map.set(key, i)
    }

    bench('Object property access', () => {
      for (let i = 0; i < 100; i++) {
        const value = obj[`key${i}`]
      }
    })

    bench('Map.get()', () => {
      for (let i = 0; i < 100; i++) {
        const value = map.get(`key${i}`)
      }
    })

    bench('Object property set', () => {
      for (let i = 0; i < 100; i++) {
        obj[`newKey${i}`] = i
      }
    })

    bench('Map.set()', () => {
      for (let i = 0; i < 100; i++) {
        map.set(`newKey${i}`, i)
      }
    })

    bench('Object.hasOwnProperty()', () => {
      for (let i = 0; i < 100; i++) {
        obj.hasOwnProperty(`key${i}`)
      }
    })

    bench('Map.has()', () => {
      for (let i = 0; i < 100; i++) {
        map.has(`key${i}`)
      }
    })
  })
})