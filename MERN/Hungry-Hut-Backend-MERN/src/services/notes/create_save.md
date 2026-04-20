# Create vs Save

## 🔎 `Model.create()`

- **Shortcut method**: It combines `new Model()` and `.save()` into one step.
- You pass in plain data, and Mongoose:
  1. Instantiates a new document (`new User({...})`).
  2. Immediately saves it to the database (`.save()`).
- Returns the saved document with `_id` and defaults applied.
- Example:

  ```js
  const user = await User.create({
    fullName,
    email,
    password,
    role
  });
  ```

## 🔎 `new Model()` + `.save()`

- **Two-step process**:
  1. Create a document instance in memory:

     ```js
     const user = new User({ fullName, email, password, role });
     ```

  2. Save it explicitly:

     ```js
     await user.save();
     ```

- This gives you a chance to manipulate the document before saving (e.g., set virtuals, run custom methods, modify fields).

---

### ✅ Why `create()` is used in your `createUser` function

- You don’t need to modify the document before saving — you just want to insert it directly.
- `create()` is shorter, cleaner, and more readable for this case.
- It also supports inserting multiple documents at once if you pass an array.

---

### 🚀 When to prefer each

- **Use `create()`**: When you want a quick insert with no intermediate logic.
- **Use `new + save()`**: When you need to:
  - Run custom instance methods before saving.
  - Conditionally modify fields.
  - Work with the document in memory before persisting.

---

So in your `createUser`, `create()` is perfect because you already prepared the data (hashed password, checked uniqueness) and just want to persist it.
