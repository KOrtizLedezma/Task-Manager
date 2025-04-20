export async function fetchUserTasks(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data().tasks || [] : [];
  }
  
  export async function addTask(userId, taskName) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
  
    const task = { taskName, state: false };
    const currentTasks = userDoc.data().tasks || [];
    currentTasks.push(task);
  
    await setDoc(userRef, { tasks: currentTasks }, { merge: true });
    return currentTasks;
  }
  
  export async function deleteTask(userId, taskIndex) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const currentTasks = userDoc.data().tasks || [];
  
    currentTasks.splice(taskIndex, 1);
    await setDoc(userRef, { tasks: currentTasks }, { merge: true });
    return currentTasks;
  }
  