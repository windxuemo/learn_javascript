
function test(){
    this.a = 10;
    console.log(this.a);

    // var self = this;
    function bbb()
    {
        console.log(this.a)
    }

    bbb()

}

new test()

a = 20;

// console.log(a)
// test();

// console.log(a)

var obj = {
    a: 30
}

// console.log(obj.a)
obj.func = test;
// obj.func();
// console.log(obj.a)
