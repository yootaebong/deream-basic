// 여러 개의 변수를 한번에 선언하는 것은 var hoisting의 잔재.


class main {
  constructor(){
    this._dataUrl = "/data/data.json"
    this.lifeCycle()
  }

  lifeCycle = async() => {
    // 데이터를 받아옴
    this._items = await this.getData()
    // 받아온 데이터를 통해 json으로 아이템을 만들고
    const createdItems = this._items.map(this.createElement)
    // 컨테이너 찾기
    const itemContainer = document.querySelector('.items')
    // 컨테이너에 아이템 element 리스트 추가
    itemContainer.append(...createdItems)
    //  버튼 컨테이너 찾고
    const btns = document.querySelector('.buttons')
    // 각 아이템에 버튼 클릭 이벤트 달아주기/
    btns.addEventListener('click',e => this.onButtonClick(e,createdItems))
  }

  getData = async() => {
    //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    return await fetch(this._dataUrl)
    // res에는 fetch 전반적 데이터가 들어가있고 원하는 데이터는 body안에 들어가 있다. body 를 가져오는건 json 화 시키면 됨.
    .then(res => res.json())
    // 데이터 파싱
    .then(res => res.items)
    .catch(e => console.error(e))
  }

  createElement(item) {
    const img = document.createElement('img');
    img.setAttribute('class', 'thumbnail');
    img.setAttribute('src', item.image);
  
    const span = document.createElement('span');
    span.setAttribute('class', 'description');
    span.innerText = `${item.gender}, ${item.size} size`;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-type', item.type);
    li.setAttribute('data-color', item.color);
    li.append(img);
    li.append(span);
    return li;
  }
  onButtonClick(event, items) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;
    if (key == null || value == null) {
      return;
    }
    this.updateItems(items, key, value);
  }
  
  // Make the items matching {key: value} invisible.
  updateItems(items, key, value) {
    items.forEach(item => {
      if (item.dataset[key] === value) {
        item.classList.remove('invisible');
      } else {
        item.classList.add('invisible');
      }
    });
  }
  
}

const mainRepo = new main()