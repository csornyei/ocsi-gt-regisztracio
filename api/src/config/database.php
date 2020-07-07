<?php

    class Database {
        private $host = "database";
        private $db_name = "adatbazis";
        private $db_username = "root";
        private $db_password = "jelszo";
        public $conn;

        public function getConnection(){

            $this->conn = null;

            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->db_username, $this->db_password);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }

            return $this->conn;
        }
    }
?>