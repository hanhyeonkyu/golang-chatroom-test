package redisCacheDb

import (
	"github.com/go-redis/redis/v7"
)

var rdb redis.Client

func init() {
	redisURL, err := redis.ParseURL("redis://127.0.0.1:6379")
	if err != nil {
		panic(err)
	}
	rdb = *redis.NewClient(redisURL)
}

func Get(key string) string {
	return rdb.Get(key).Val()
}

func Set(key string, value string) {
	rdb.Set(key, value, 1000*60*60)
}
