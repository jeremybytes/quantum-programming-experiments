# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 2 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 2-1
HAD / HAD = original  
HAD / read / HAD = destroys original  

```js
qc.reset(1);
qc.write(0);
qc.had();
//qc.read();
qc.had();
var output = qc.read();
qc.print(output + '\n');
```

### Exp 2-2
HAD + exchange + HAD to get original value somewhere else

```js
qc.reset(2);
qc.discard();
var a = qint.new(1, 'origin');
var b = qint.new(1, 'destination');
a.write(1);
a.had();
b.exchange(a);
b.had();
var output = b.read();
qc.print(output + '\n');
```

### Exp 2-3
PHASE(180) = HAD NOT HAD

```js
qc.reset(1);
qc.write(1);

// this...
qc.phase(180);

// ... is the same as this
//qc.had();
//qc.not();
//qc.had()

var output = qc.read();
```

### Exp 2-4
NOT = HAD PHASE(180) HAD

```js
qc.reset(1);
qc.write(0);

// this...
qc.not();

// ... is the same as this
//qc.had();
//qc.phase(180);
//qc.had()

var output = qc.read();
```