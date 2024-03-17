# 快速开始

## 接入流程

### 1. 注册账号

访问[开发者中心](#)，注册账号。

### 2. 获取 AppKey 和 AppSecret

注册完账号后，在个人详情页面可以获取到 AppKey 和 AppSecret。

### 3. 发起请求

- 需要对参数进行加密
- header 加入 appKey、[sign](#sign)

## sign 加密 {#sign}

1. 请求中所有的参数按 key 进行字典升序排列，将排序后的参数(key=value)用`&`拼接起来
2. 将 `appKey=value&` 拼接到源串的前面
3. 将 `&appSecret=value` 拼接到源串的末尾

### 加密示例

::: tip PR：
欢迎提供其他语言的加密示例，提交 PR 即可。
:::

::: details Go：

```go
// key排序
var keys sort.StringSlice
for k := range params {
  keys = append(keys, k)
}
keys.Sort()

// 把所有参数名和参数值串在一起
query := bytes.NewBufferString(fmt.Sprintf("appKey=%v", appKey))
for _, k := range keys {
  query.WriteString(fmt.Sprintf("&%s=%v", k, params[k]))
}
query.WriteString(fmt.Sprintf("&appSecret=%v", appSecret))

// 使用MD5加密
h := md5.New()
io.Copy(h, query)
sign := hex.EncodeToString(h.Sum(nil))
```

:::

::: details Java：

```java
// Maven依赖，必须是在这个版本以上
// <dependency>
//     <groupId>cn.hutool</groupId>
//     <artifactId>hutool-all</artifactId>
//     <version>5.8.4</version>
// </dependency>

package cn.demo;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

@SpringBootTest
public class DemoHttp {
    static String appKey = "<请填写>";
    static String appSecret = "<请填写>";

    @Test
    public void demo() {
        // 请求地址
        String url = "";

        // 获取当前时间戳
        long timeMillis = System.currentTimeMillis();

        // 请求参数
        TreeMap<String, Object> map = new TreeMap<>();
        map.put("timestamp", String.valueOf(timeMillis));// 时间戳必须为 String 类型

        // map转换为json
        JSONObject json = JSONUtil.parseObj(map);
        // 请求参数拼接字符串
        String sign = getSign(json);

        // 请求头信息
        HashMap<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");
        headerMap.put("App-key", appKey);
        headerMap.put("Sign", sign);

        // 开始请求
        HttpResponse response = HttpRequest.post(url)
                .headerMap(headerMap, false)
                .body(json.toString())
                .timeout(5 * 60 * 1000)
                .execute();

        // 打印返回信息
        System.out.println(response);
    }

    /**
     * 请求参数拼接
     * @param json 请求参数
     * @return 返回sign
     */
    private static String getSign(JSONObject json) {
        StringBuilder params = new StringBuilder();
        // 拼接请求参数
        for (String key : json.keySet()) {
            params.append("&").append(key).append("=").append(json.get(key));
        }
        // 将所有参数拼接（包括请求参数）
        String str = "appKey=" + appKey + params + "&appSecret=" + appSecret;

        // md5加密
        return DigestUtils.md5DigestAsHex(str.getBytes());
    }
}


```

:::

## 接口响应示例

```json
{
  "code": 0,
  "msg": "success", // 成功和失败的响应消息
  "data": {} // 响应数据，所有接口正常返回的数据都放在该字段下
}
```

## 响应码

| code |  remark  |
| ---- | :------: |
| 0    |   正常   |
| -1   |   错误   |
| 1000 | 加密错误 |
