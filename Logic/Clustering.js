let Alea = require("alea");

let Mathseedrandom = function (seed) {
  Math.random = new Alea(seed);
};

class Clustering {

  constructor(sys = true) {
    this.sys = sys
  }

  EuclideanDistance(x, y) {
    let result = 0
    for (let i = 0; i < x.length; i++) {
      result += (x[i] - y[i]) ** 2
    }
    return Math.sqrt(result)
  }

  Mean(data) {
    let sum = 0
    for (let d of data) {
      sum += d
    }
    return sum / data.length
  }

  findCenterRandom(data) {
    let index = Math.floor(Math.random() * (data.length)) + 0
    return data[index]
  }

  systematicSample(data, n) {
    data.sort((a, b) => (a - b))

    let k = Math.floor(data.length / n)
    let result = []
    let i = Math.floor(Math.random() * (k)) + 0

    let j = 0
    while (j < n) {
      if (!result.find((r) => (r == data[i]))) {
        result.push(data[i])
      } else {
        let random = (this.findCenterRandom(data))
        if (!result.find((r) => (r == random))) { result.push(random) }
        else continue
      }
      i += k
      j++
    }
    return result
  }

  findCluster(titik, centroids) {
    let min = Infinity
    let index = null
    for (let i = 0; i < centroids.length; i++) {
      if (this.EuclideanDistance([titik], [centroids[i]]) < min) {
        min = this.EuclideanDistance([titik], [centroids[i]])
        index = i
      }
    }
    return index
  }

  sameArray(arr1, arr2) {
    if (arr1.length !== arr2.length) return false
    let sum = 0
    arr1.sort((a, b) => (a - b))
    arr2.sort((a, b) => (a - b))

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) sum += 1
    }
    return sum === arr1.length ? true : false
  }

  kMeans(data, k) {
    let clusters = []
    let centroids = []
    let check = []

    Mathseedrandom(42)

    let i = 0
    while (i < k) {
      if (this.sys) {
        let sample = this.systematicSample(data, k)
        for (let s of sample) {
          centroids.push(s)
          i++
        }
      } else {
        let random = this.findCenterRandom(data)
        if (!centroids.some((c) => (c == random))) {
          centroids.push(random)
          i++
        }
      }
    }

    centroids.sort((a, b) => (a - b))

    for (let i = 0; i < centroids.length; i++) {
      clusters.push([])
      check.push([])
    }

    while (true) {

      for (let j = 0; j < centroids.length; j++) {
        check[j] = clusters[j]
        clusters[j] = []
      }

      for (let i = 0; i < data.length; i++) {
        let index = this.findCluster(data[i], centroids)
        clusters[index].push(data[i])
      }

      for (let j = 0; j < centroids.length; j++) {
        centroids[j] = this.Mean(clusters[j])
      }
      let result = 0
      for (let i = 0; i < clusters.length; i++) {
        if (this.sameArray(clusters[i], check[i])) {
          if (this.Mean(clusters[i]) === this.Mean(check[i])) {
            result += 1
          }
        }
      }

      if (result === clusters.length) {
        break
      }
    }

    for (let cluster of clusters) {
      cluster.sort((a, b) => (a - b))
    }


    return { clusters, centroids }
  }
}


// let clustering = new Clustering(true)







// console.log("-------------------------------");
// console.log(clustering.kMeans([1, 7, 10, 10, 10, 10, 46], 3));

// console.log(clustering.findCluster(92, result.centroids));


module.exports = Clustering