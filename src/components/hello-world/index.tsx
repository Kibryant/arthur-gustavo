import { useState } from 'react'
import { motion } from 'framer-motion'
import { JavaScript } from '../icons/javascript'
import { TypeScript } from '../icons/typescript'
import { Python } from '../icons/python'
import { Go } from '../icons/go'
import { C } from '../icons/c'
import { Rust } from '../icons/rust'
import { Java } from '../icons/java'

const languages = [
  {
    name: 'TypeScript',
    code: "console.log('Hello, World!');",
    icon: TypeScript,
    color: '#007ACC',
  },
  {
    name: 'JavaScript',
    code: "console.log('Hello, World!');",
    icon: JavaScript,
    color: '#F7DF1E',
  },
  {
    name: 'Python',
    code: "print('Hello, World!')",
    icon: Python,
    color: '#3776AB',
  },
  {
    name: 'Go',
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
    icon: Go,
    color: '#00ADD8',
  },
  {
    name: 'C',
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    icon: C,
    color: '#A8B9CC',
  },
  {
    name: 'Rust',
    code: `fn main() {
    println!("Hello, World!");
}`,
    icon: Rust,
    color: '#DEA584',
  },
  {
    name: 'Java',
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    icon: Java,
    color: '#007396',
  },
]

export function HelloWorld() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="w-full py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-primary">
        Hello, World!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative rounded-xl p-6 shadow-xl transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 h-full">
              <div className="flex items-center mb-4">
                <lang.icon
                  className="w-8 h-8 mr-3"
                  style={{ color: lang.color }}
                />
                <h2 className="text-2xl font-bold">{lang.name}</h2>
              </div>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-primary">{lang.code}</code>
              </pre>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 right-2 bg-[#6272a4] text-white px-2 py-1 rounded-md text-xs"
                >
                  Copy Code
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
