let arrayData = [];
let isRunning = false;

// INFO HELPER
function setInfo(text) {
  document.getElementById('info').textContent = text;
}

// CEK SORTED
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

// RENDER ARRAY
function renderArray(highlightIndex = -1, sortedIndices = [], range = {}) {
  const container = document.getElementById('arrayView');
  container.innerHTML = '';

  arrayData.forEach((val, idx) => {
    const box = document.createElement('div');
    box.className = 'array-box';
    box.textContent = val;

    if (idx === highlightIndex) box.classList.add('highlight');
    if (sortedIndices.includes(idx)) box.classList.add('sorted');
    if (idx === range.left) box.classList.add('left');
    if (idx === range.mid) box.classList.add('mid');
    if (idx === range.right) box.classList.add('right');

    container.appendChild(box);
  });
}

// INSERT
function insertArray() {
  if (isRunning) return;

  const val = document.getElementById('valueInput').value;
  const idx = document.getElementById('indexInput').value;

  if (val === '') return alert('Isi nilai terlebih dahulu!');

  if (idx === '') arrayData.push(Number(val));
  else {
    const indexNum = Number(idx);
    if (indexNum < 0 || indexNum > arrayData.length)
      return alert('Index tidak valid!');
    arrayData.splice(indexNum, 0, Number(val));
  }

  renderArray();
  setInfo('');
}

// DELETE
function deleteArray() {
  if (isRunning) return;

  const idx = document.getElementById('indexInput').value;
  if (arrayData.length === 0) return alert('Array kosong!');

  if (idx === '') arrayData.pop();
  else {
    const indexNum = Number(idx);
    if (indexNum < 0 || indexNum >= arrayData.length)
      return alert('Index tidak valid!');
    arrayData.splice(indexNum, 1);
  }

  renderArray();
  setInfo('');
}

// RESET
function resetArray() {
  if (isRunning) return;
  arrayData = [];
  renderArray();
  setInfo('');
}

// BUBBLE SORT
function bubbleSort() {
  if (arrayData.length < 2 || isRunning) return;
  isRunning = true;

  let n = arrayData.length;
  let sortedIndices = [];
  let i = 0, j = 0;

  const interval = setInterval(() => {
    if (i < n - 1) {
      if (j < n - i - 1) {
        setInfo(`Bubble Sort: bandingkan indeks ${j} dan ${j + 1}`);
        if (arrayData[j] > arrayData[j + 1]) {
          [arrayData[j], arrayData[j + 1]] = [arrayData[j + 1], arrayData[j]];
        }
        renderArray(j + 1, sortedIndices);
        j++;
      } else {
        sortedIndices.push(n - i - 1);
        j = 0;
        i++;
      }
    } else {
      sortedIndices.push(0);
      renderArray(-1, sortedIndices);
      setInfo('Bubble Sort selesai!');
      clearInterval(interval);
      isRunning = false;
    }
  }, 300);
}

// LINEAR SEARCH
function linearSearch() {
  if (isRunning) return;
  const val = Number(document.getElementById('valueInput').value);
  if (isNaN(val)) return alert('Isi nilai untuk dicari!');

  isRunning = true;
  let i = 0;

  const interval = setInterval(() => {
    if (i < arrayData.length) {
      setInfo(`Linear Search: cek indeks ${i}`);
      renderArray(i);

      if (arrayData[i] === val) {
        setInfo(`Linear Search: ditemukan di indeks ${i}`);
        clearInterval(interval);
        isRunning = false;
        return;
      }
      i++;
    } else {
      setInfo('Linear Search: nilai tidak ditemukan!');
      renderArray();
      clearInterval(interval);
      isRunning = false;
    }
  }, 400);
}

// BINARY SEARCH
function binarySearch() {
  if (isRunning) return;

  const val = Number(document.getElementById('valueInput').value);
  if (isNaN(val)) return alert('Isi nilai untuk dicari!');
  if (arrayData.length === 0) return alert('Array kosong!');
  if (!isSorted(arrayData))
    return alert('Binary Search hanya bisa pada array yang sudah diurutkan!');

  isRunning = true;
  let left = 0;
  let right = arrayData.length - 1;

  const interval = setInterval(() => {
    if (left <= right) {
      let mid = Math.floor((left + right) / 2);
      setInfo(`Binary Search: left=${left}, mid=${mid}, right=${right}`);
      renderArray(mid, [], { left, mid, right });

      if (arrayData[mid] === val) {
        setInfo(`Binary Search: ditemukan di indeks ${mid}`);
        clearInterval(interval);
        isRunning = false;
      } else if (arrayData[mid] < val) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      setInfo('Binary Search: nilai tidak ditemukan!');
      renderArray();
      clearInterval(interval);
      isRunning = false;
    }
  }, 400);
}

// INITIAL
renderArray();

