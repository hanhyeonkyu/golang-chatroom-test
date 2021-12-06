package main

import (
	redisCacheDb "chat-app-test/modules"
	_ "chat-app-test/routers"
	"fmt"

	"github.com/astaxie/beego"
	"github.com/beego/i18n"
)

const (
	APP_VER = "0.1.1.0227"
)

func main() {
	beego.Info(beego.BConfig.AppName, APP_VER)

	// Register template functions.
	beego.AddFuncMap("i18n", i18n.Tr)
	redisCacheDb.Set("test", "[{wow: 213}]")
	fmt.Println(redisCacheDb.Get("test"))
	beego.Run()
}
