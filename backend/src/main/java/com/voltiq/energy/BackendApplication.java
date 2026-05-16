package com.voltiq.energy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@EnableScheduling
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(BackendApplication.class);
		application.setDefaultProperties(renderDatabaseProperties());
		application.run(args);
	}

	private static Map<String, Object> renderDatabaseProperties() {
		Map<String, Object> properties = new HashMap<>();
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl == null || !databaseUrl.startsWith("postgresql://")) {
			return properties;
		}

		URI uri = URI.create(databaseUrl);
		String[] userInfo = uri.getUserInfo().split(":", 2);
		String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();
		if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
			jdbcUrl += "?" + uri.getQuery();
		}
		properties.put("spring.datasource.url", jdbcUrl);
		properties.put("spring.datasource.username", decode(userInfo[0]));
		properties.put("spring.datasource.password", userInfo.length > 1 ? decode(userInfo[1]) : "");
		return properties;
	}

	private static String decode(String value) {
		return URLDecoder.decode(value, StandardCharsets.UTF_8);
	}
}
