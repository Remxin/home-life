package main

import (
	"fmt"
	"net/http"
)

func initializeRoutes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /comment", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Get!");
	})

	mux.HandleFunc("GET /comment/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		fmt.Fprintf(w, "Get comment with id %s", id);
	})

	mux.HandleFunc("POST /comment", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Post!");
	})


	return mux
   }