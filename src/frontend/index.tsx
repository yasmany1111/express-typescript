import { h } from 'preact';

type MyComponentProps = {
  name: string;
  age: number;
};

export function MyComponent({ name, age }: MyComponentProps) {
  return (
    <div>
      My name is {name}, I am {age.toString()} years old.
    </div>
  );
}
