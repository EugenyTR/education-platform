<?php

declare(strict_types=1);

namespace App;

class Router
{
    private array $routes = [];

    public function get(string $path, callable|array $handler): void
    {
        $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->addRoute('POST', $path, $handler);
    }

    public function put(string $path, callable|array $handler): void
    {
        $this->addRoute('PUT', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): void
    {
        $this->addRoute('DELETE', $path, $handler);
    }

    private function addRoute(string $method, string $path, callable|array $handler): void
    {
        $this->routes[$method][$path] = $handler;
    }

    private function match(string $method, string $path): callable|array|null
    {
        if (!isset($this->routes[$method])) {
            return null;
        }

        // Exact match first
        if (isset($this->routes[$method][$path])) {
            return $this->routes[$method][$path];
        }

        // Regex match - convert route patterns to regex
        foreach ($this->routes[$method] as $route => $handler) {
            // Escape special regex chars, then convert our patterns
            $pattern = preg_quote($route, '#');
            // Convert \d+ and \w+ back (preg_quote escapes them)
            $pattern = str_replace('\d+', '\d+', $pattern);
            $pattern = str_replace('\w+', '\w+', $pattern);
            $pattern = '#^' . $pattern . '$#';

            if (preg_match($pattern, $path)) {
                return $handler;
            }
        }

        return null;
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Remove trailing slash except root
        if ($path !== '/' && str_ends_with($path, '/')) {
            $path = rtrim($path, '/');
        }

        $handler = $this->match($method, $path);

        if ($handler === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }

        try {
            if (is_array($handler)) {
                [$class, $methodName] = $handler;
                $controller = new $class();
                $response = $controller->$methodName();
            } else {
                $response = $handler();
            }

            if (is_array($response) || is_object($response)) {
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
            } else {
                echo $response;
            }
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
        }
    }
}
