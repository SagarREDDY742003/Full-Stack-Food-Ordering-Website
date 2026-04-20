# Sessions in Mongoose

Using a **session** in Mongoose is all about enabling **transactions** — which give you control over multiple operations so they either all succeed or all fail together.  

## 🔎 What a session does

- A **session** is a context object that groups database operations together.  
- When you start a transaction on a session, every query you run with `{ session }` becomes part of that transaction.  
- If one operation fails, you can **abort** the transaction and roll back all changes.  
- If everything succeeds, you **commit** the transaction and MongoDB applies all changes atomically.

---

### ✅ Why sessions are useful

1. **Atomicity**  
   - Without a session: if you save `Address` successfully but `Restaurant` fails, you’ll end up with an orphaned `Address`.  
   - With a session: both are rolled back if one fails, so your data stays consistent.

2. **Consistency across collections**  
   - Transactions can span multiple collections (`addresses`, `restaurants`, `orders`, etc.), ensuring they all stay in sync.

3. **Error safety**  
   - You can catch errors and abort the transaction, preventing partial writes.

---

### ⚡ Example

```js
const session = await mongoose.startSession();
session.startTransaction();

try {
  const savedAddress = await Address.create([{ ...req.address }], { session });
  const restaurant = await Restaurant.create(
    [{ ...req, owner: user, address: savedAddress[0]._id }],
    { session }
  );

  await session.commitTransaction(); // apply both
  session.endSession();

  return restaurant[0];
} catch (error) {
  await session.abortTransaction(); // rollback both
  session.endSession();
  throw new Error(error.message);
}
```

---

### 🔎 When sessions/transactions are useful

- When you need to perform **multiple related writes** that must succeed or fail together.  
  Example: Create a `User` and also create a `Profile` or `Settings` document linked to that user.  
- When you’re updating **multiple collections** in one logical operation.  
- When you want to guarantee **atomicity** across several steps.

---

### 🔑 In short

- **Without session**: each `.save()` or `.create()` is independent.  
- **With session**: you can wrap multiple operations into one **transaction**, guaranteeing all-or-nothing behavior.  

This is especially important in apps like yours where `Restaurant` depends on `Address` — you don’t want dangling records if something goes wrong.
