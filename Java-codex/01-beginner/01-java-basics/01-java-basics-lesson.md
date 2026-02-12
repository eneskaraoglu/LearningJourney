# Java Basics

## Goals
- Set up a minimal Java program and run it from the command line.
- Use variables, control flow, methods, arrays, and strings.
- Explain core interview facts about the JVM and String behavior.

## Core Concepts
The JDK provides `javac` for compilation and `java` for execution. A class with a `public static void main(String[] args)` method is the entry point. Use primitives (`int`, `double`, `boolean`) for basic values and wrapper types (`Integer`, `Double`) when objects are needed.

Strings are immutable and compared by content using `equals`, not `==`. Arrays have fixed size; prefer `ArrayList` for dynamic collections (covered later). Keep code in packages to avoid classpath issues and to model real project structure.

## Interview Focus
- JDK vs JRE vs JVM
- `==` vs `equals` for objects
- String immutability and `StringBuilder`
- Primitive vs wrapper types and autoboxing

## Quick Example
```java
public class Hello {
  public static void main(String[] args) {
    int sum = 0;
    for (String arg : args) {
      sum += Integer.parseInt(arg);
    }
    System.out.println("Sum = " + sum);
  }
}
```
