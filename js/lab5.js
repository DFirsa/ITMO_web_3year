// task1
function gennerateArray(length) {
    var array = [];
    for (let i = 0; i < length; i++) array.push(Math.random());
    return array;
}

// task2
function get_points(array) {
    var min = Math.min.apply(null, array),
        max = Math.max.apply(null, array);

    func_mid = (arr) => {
        arr.sort()
        if (arr.length % 2 === 0)
            return (arr[Math.floor(arr.length / 2)] + arr[Math.floor(arr.length / 2) - 1]) / 2
        else
            return arr[Math.floor(arr.length / 2)]
    }

    return { "min": min, "max": max, "mid": func_mid(array) }
}

// task3 a.k.a ZACHEM MbL ETO DELAEM?????
function quickSort(arr){
    sort_custom = (arr, start_index, finish_index) => {
      var key_index = start_index;
      var start = start_index,
          finish = finish_index;
    
      swap = (arr, a, b) => [arr[a], arr[b]] = [arr[b], arr[a]]
    
      while (start !== finish) {
        if (key_index === start){
          if(arr[key_index] > arr[finish]){
            swap(arr, key_index, finish)
            key_index = finish
            start++
          }
          else finish--
        }
        else{
          if(arr[key_index] < arr[start]){
            swap(arr, key_index, start)
            key_index = start
            finish--
          }
          else start++
        }
      }
    
      if (key_index - start_index > 1) sort_custom(arr, start_index, key_index-1)
      if (finish_index - key_index > 1) sort_custom(arr, key_index + 1, finish_index)
    }
    sort_custom(arr, 0, arr.length-1)
}

// task4
function tag_counter(){
    var tags = {}
    for (const tag of document.body.getElementsByTagName('*')) {
      if (tag.tagName in tags) tags[tag.tagName] += 1
      else tags[tag.tagName] = 1
    }
  
    return tags
  }

var arr = gennerateArray(10000)
console.log("GENERATED ARRAY : ", arr)
console.log("POINTS OF ARRAY : ", get_points(arr))
var arr1 = gennerateArray(10)
quickSort(arr1)
console.log("SORTED ARRAY : ", arr1)
console.log("TAGS STATS : ", tag_counter())