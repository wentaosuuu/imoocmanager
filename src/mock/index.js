import Mock from 'mockjs';

Mock.mock('/api/table/list?page=1',{
  "code":0,
  "message":"",
  "result":{
    "list|10":[{
      "id|+1":1,
      "userName":"@cname",
      "sex|1-2":1,
      "state|1-5":1,
      "interest|1-8":1,
      "isMarried|0-1":1,
      "birthday":"2000-01-01",
      "address":"法国奥尔良",
      "time":"09:00:00"
    }],
    page:1,
    page_size:10,
    total_count:30
  }
});
