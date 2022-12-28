module.exports = {
    apps : [{
        name   : "ribo-test",
        script : "./index.js",
        watch: true,
        instances: 1,
        max_memory_restart: "1G",
        exec_mode: "fork",
        env: {
			EXPRESS_HOSTNAME: "0.0.0.0",
			MONGO_HOST: "localhost",
			MONGO_PORT: "27017",
			MONGO_DATABASE: "ribo-test"
		},
        env_production: {
			EXPRESS_HOSTNAME: "0.0.0.0",
			MONGO_HOST: "localhost",
			MONGO_PORT: "27017",
			MONGO_DATABASE: "ribo-test"
		}
    }]
}