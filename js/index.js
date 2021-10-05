//會員資料
const username_list = ["王燕萍", "里薇", "鍋餅"];
const account_list = ["test1", "test2", "test3"];
const password_list = ["123456", "123456", "123456"];
//登入
function login() {
    load_member_data();
    var acc = document.getElementById("account").value;
    var pass = document.getElementById("password").value;
    if (acc == ""){
      alert("請輸入帳號");
      cleanup();
      return;
    }
    if (pass  == ""){
      alert("請輸入密碼");
      cleanup();
      return;
    }
    // 會員資料核對
    for(var i = 0; i <username_list.length; i++){
      if(acc == account_list[i] && pass == password_list[i]){
        alert("登入成功！");
        $("#hide_").hide();
        $("#temp_name").remove();
        //temp_name是為了討論區留言取得名字所用
        $("#member_content").append("<div id='member_div'><h4>嗨囉！ <span id='temp_name'>"+username_list[i]+"</span>>< </h4>"+
                                    "<br><h4>我的收藏清單</h4><hr></div>" );
        $("#member_content").append("<br><button id='log_out' onclick='logout()'>登出</button>");
        cleanup();
        return username_list[i];
      }
    }
    alert("帳號或是密碼有誤，請重新輸入！")
    cleanup();
    return;
}
//登出並重新載入登入頁面
function logout(){
  $("#member_div").remove();
  $("#log_out").remove();
  $("#hide_").show();
  $("#hide_").append("<span id='temp_name'></span>");
  // $("#member_content").append("<div id='hide_'><form id='log_in' action='index.js' method='post'><fieldset><legend>會員登入</legend>"+
  //                             "帳號： <input type='text' id='account' size='15' autocomplete='off'><br><br>密碼： "+
  //                             "<input type='password' id='password' size='15' autocomplete='off'><br><br></fieldset>&emsp;&emsp;&emsp;"+
  //                             "<input id='enter1' type='button' value='登入' onclick='login()'></form><hr><h4>尚未擁有帳號？</h4>"+
  //                             "<button id='create'>申請帳號</button><span id='temp_name'></span></div>");
}
//創辦帳號
var member_data="";
function create() {
  var name = document.getElementById("new_username").value;
  var acc = document.getElementById("new_account").value;
  var pass = document.getElementById("new_password").value;
  if (name == ""){ 
    alert("請輸入使用者名稱");
    cleanup();
    return;
  }
  if (acc == ""){ 
    alert("請輸入帳號");
    cleanup();
    return;
  }
  if (pass == ""){ 
    alert("請輸入密碼");
    cleanup();
    return;
  }
  for(var i = 0; i <account_list.length; i++){
    if(acc == account_list[i]){
      alert("此帳號已被人註冊，請重新申請！");
      cleanup();
      return;
    }
  }
  member_data = localStorage.getItem("member");
  member_data +="|"+ name+"|"+acc+"|"+pass; 
  var storage_command = localStorage.setItem("member", member_data);
  alert("註冊成功！");
  $("#create_form").hide();
  $("#hide_").show();
  cleanup();
}
//將註冊帳號加入會員資料的array
function load_member_data(){
  member_data = localStorage.getItem("member");
  var temp;
  if(member_data == null){
    return;
  }
  else{
    temp = member_data.split("|");
  }
  for (var i = 1; i < temp.length;){
    username_list.push(temp[i]);
    account_list.push(temp[i+1]);
    password_list.push(temp[i+2]);
    i=i+3;
  }
}
//清空欄位
function cleanup(){
  document.getElementById("account").value="";
  document.getElementById("password").value="";
  document.getElementById("new_username").value ="";
  document.getElementById("new_account").value ="";
  document.getElementById("new_password").value ="";
}
//新增至收藏名單
function add(num){
  if(document.getElementById("temp_name").innerHTML == ""){
    alert("此功能必須先登錄會員才能啟用！");
    return;
  }
  if(num == 1){
    $("#member_div").append("<a id='movie1'>神力女超人1984</a><br>");
  }
  if (num == 2){
    $("#member_div").append("<a id='movie2'>古魯家族：新石代</a><br>");
  }
  if (num == 3){
    $("#member_div").append("<a id='movie3'>魔物獵人</a><br>");
  }
  if (num == 4){
    $("#member_div").append("<a id='movie4'>孤味</a><br>");
  }
  if (num == 5){
    $("#member_div").append("<a id='movie5'>親愛的房客</a><br>");
  }
  if (num == 6){
    $("#member_div").append("<a id='movie6'>腿</a><br>");
  }
  if (num == 7){
    $("#member_div").append("<a id='movie7'>杏林醫院</a><br>");
  }
}
//取得時間
function get_time(){
  var now = new Date().toLocaleString();
  return now;
}

//發布留言
var temp_storage ="";
function message1() {
  temp_storage = localStorage.getItem("storage1");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area1").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage1",temp_storage);
    document.getElementById("num_messages").innerHTML = $("#message_area1").children("div").length;
  }
  else{
    $("#message_area1").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage1",temp_storage);
    document.getElementById("num_messages").innerHTML = $("#message_area1").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message1(){
  var temp ="";
  temp_storage = localStorage.getItem("storage1");
  if(temp_storage == null){
    return;
  }
  else{
    temp = temp_storage.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area1").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages").innerHTML = $("#message_area1").children("div").length;
  return;
}

//接下來是重複的code，但因為每個電影的html不同必須分開寫，movie2的部分
//發布留言
var temp_storage2 ="";
function message2() {
  temp_storage2 = localStorage.getItem("storage2");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area2").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage2 += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage2",temp_storage2);
    document.getElementById("num_messages2").innerHTML = $("#message_area2").children("div").length;
  }
  else{
    $("#message_area2").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage2 += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage2",temp_storage2);
    document.getElementById("num_messages2").innerHTML = $("#message_area2").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message2(){
  temp_storage2 = localStorage.getItem("storage2");
  var temp ="";
  if(temp_storage2 == null){
    return;
  }
  else{
    temp = temp_storage2.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area2").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages2").innerHTML = $("#message_area2").children("div").length;
  return;
}
//movie3的部分
//發布留言
var temp_storage3 ="";
function message3() {
  temp_storage3 = localStorage.getItem("storage3");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area3").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage3 += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage3",temp_storage3);
    document.getElementById("num_messages3").innerHTML = $("#message_area3").children("div").length;
  }
  else{
    $("#message_area3").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage3 += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage3",temp_storage3);
    document.getElementById("num_messages3").innerHTML = $("#message_area3").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message3(){
  temp_storage3 = localStorage.getItem("storage3");
  var temp ="";
  if(temp_storage3 == null){
    return;
  }
  else{
    temp = temp_storage3.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area3").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages3").innerHTML = $("#message_area3").children("div").length;
  return;
}
//movie4的部分
//發布留言
var temp_storage4 ="";
function message4() {
  temp_storage4 = localStorage.getItem("storage4");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area4").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage4 += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage4",temp_storage4);
    document.getElementById("num_messages4").innerHTML = $("#message_area4").children("div").length;
  }
  else{
    $("#message_area4").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage4 += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage4",temp_storage4);
    document.getElementById("num_messages4").innerHTML = $("#message_area4").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message4(){
  temp_storage4 = localStorage.getItem("storage4");
  var temp ="";
  if(temp_storage4 == null){
    return;
  }
  else{
    temp = temp_storage4.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area4").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages4").innerHTML = $("#message_area4").children("div").length;
  return;
}
//movie5的部分
//發布留言
var temp_storage5 ="";
function message5() {
  temp_storage5 = localStorage.getItem("storage5");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area5").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage5 += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage5",temp_storage5);
    document.getElementById("num_messages5").innerHTML = $("#message_area5").children("div").length;
  }
  else{
    $("#message_area5").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage5 += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage5",temp_storage5);
    document.getElementById("num_messages5").innerHTML = $("#message_area5").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message5(){
  temp_storage5 = localStorage.getItem("storage5");
  var temp ="";
  if(temp_storage5 == null){
    return;
  }
  else{
    temp = temp_storage5.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area5").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages5").innerHTML = $("#message_area5").children("div").length;
  return;
}
//movie6的部分
//發布留言
var temp_storage6 ="";
function message6() {
  temp_storage6 = localStorage.getItem("storage6");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area6").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage6 += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage6",temp_storage6);
    document.getElementById("num_messages6").innerHTML = $("#message_area6").children("div").length;
  }
  else{
    $("#message_area6").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage6 += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage6",temp_storage6);
    document.getElementById("num_messages6").innerHTML = $("#message_area6").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message6(){
  temp_storage6 = localStorage.getItem("storage6");
  var temp ="";
  if(temp_storage6 == null){
    return;
  }
  else{
    temp = temp_storage6.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area6").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages6").innerHTML = $("#message_area6").children("div").length;
  return;
}
//movie7的部分
//發布留言
var temp_storage7 ="";
function message7() {
  temp_storage7 = localStorage.getItem("storage7");
  var name = document.getElementById("temp_name").innerHTML;
  var now = get_time();
  var text = document.getElementById("discuss").value;
  //不允許text為空的
  if(text == ""){
    alert("留言區不得為空！")
    return;
  }
  //視是否有登入會員
  if(name == ""){
    $("#message_area7").append("<div>"+"路人 "+"<span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage7 += "|路人 |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage7",temp_storage7);
    document.getElementById("num_messages7").innerHTML = $("#message_area7").children("div").length;
  }
  else{
    $("#message_area7").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
    temp_storage7 += "|"+name+" |"+now+"|"+text; 
    var storage_command = localStorage.setItem("storage7",temp_storage7);
    document.getElementById("num_messages7").innerHTML = $("#message_area7").children("div").length;
  }
  document.getElementById("discuss").value="";
}
// 加載留言
function load_message7(){
  temp_storage7 = localStorage.getItem("storage7");
  var temp ="";
  if(temp_storage7 == null){
    return;
  }
  else{
    temp = temp_storage7.split("|");
  }
  var name;
  var now;
  var text;
  for(var i = 1; i < temp.length;){
    name = temp[i];
    now = temp[i+1];
    text = temp[i+2];
    i=i+3;
    $("#message_area7").append("<div>"+name+" <span id='now_'>"+now+"</span><br>"+text+"</div>");
  }
  document.getElementById("num_messages7").innerHTML = $("#message_area7").children("div").length;
  return;
}